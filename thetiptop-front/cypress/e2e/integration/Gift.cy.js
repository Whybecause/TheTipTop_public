describe('gift', () => {
  before(() => {
    // We reregister the default user account
    // Because Auth.cy.js delete all user account on init
    cy.fixture('defaultUser').then((user) => {
      cy.register(user);
    });
  });
  beforeEach(() => {
    cy.loginAdmin();
    cy.deleteGifts();
  });

  describe('POST /gift', () => {
    it('should fail if missing params', () => {
      cy.authRequest('POST', '/gift', {}, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.success).to.equal(false);
      });
    });

    it('should fail if wrong params', () => {
      cy.authRequest('POST', '/gift', { giftAmount: null }, false)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.success).to.equal(false);
          });
    });

    it('should create gifts', () => {
      cy.authRequest('POST', '/gift', { giftAmount: 100 })
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(true);
          });
    });
  });

  describe('POST /gift/submit-code', () => {
    it('should fail if missing params', () => {
      cy.authRequest('POST', '/gift/submit-code', {}, false)
          .then((response) => {
            expect(response.status).to.equal(400);
          });
    });

    it('should fail if code has not been picked', () => {
      cy.authRequest('POST', '/gift', { giftAmount: 5 });

      cy.authRequest('GET', '/gift').then((response) => {
        const code = response.body.content[0].code;
        cy.authRequest('POST', '/gift/submit-code', { code }, false)
            .then((response) => {
              expect(response.status).to.equal(404);
              expect(response.body.content)
                  .to.equal('Ce code n\'est pas valide');
            });
      });
    });

    it('should fail if code has already been played', () => {
      cy.createGifts(5);

      cy.pickCode().then((response) => {
        const code = response.body.content;
        cy.submitCode(code);
        cy.submitCode(code)
            .then((response) => {
              expect(response.status).to.equal(409);
              expect(response.body.content)
                  .to.equal('Ce code a déjà été utilisé');
            });
      });
    });

    it('should submit a code', () => {
      cy.createGifts(5);

      cy.pickCode().then((response) => {
        cy.submitCode(response.body.content)
            .then((response) => {
              expect(response.body.content.UserId).to.not.be.null;
            });
      });
    });
  });


  describe('GET /gift', () => {
    it('should fetch all existing gifts', () => {
      cy.authRequest('GET', '/gift')
          .then((response) => {
            expect(response.status).to.equal(200);
          });
    });
  });

  describe('GET /gift/belongs/:userId', () => {
    it('should fail if request is not made by the owner', () => {
      cy.fixture('defaultUser').then((user) => {
        cy.login(user);
        cy.authRequest('GET', '/gift/belongs/coucou', {}, false)
            .then((response) => {
              expect(response.status).to.equal(403);
              expect(response.body.content).to.equal('Unauthorized');
            });
      });
    });

    it('should fetch all gifts a user has', () => {
      cy.fixture('defaultUser').then((user) => {
        cy.login(user);
        cy.requestByUserId('GET', '/gift/belongs')
            .then((response) => {
              expect(response.status).to.equal(200);
            });
      });
    });
  });

  describe('GET /gift/code', () => {
    it('should fail if no gifts', () => {
      cy.authRequest('GET', '/gift/code', {}, false)
          .then((response) => {
            expect(response.status).to.equal(404);
          });
    });

    it('should fail if all gifts have been picked', () => {
      cy.createGifts(5);

      // We pick all the codes
      cy.authRequest('GET', '/gift')
          .then((response) => {
            const nbGifts = response.body.content.length;
            for (let i = 0; i < nbGifts; i ++) {
              cy.pickCode();
            }
          });

      // Try to pick a code when all codes have been picked
      cy.pickCode()
          .then((response) => expect(response.status).to.equal(404));
    });

    it('should pick a code', () => {
      cy.loginAdmin();
      cy.authRequest('DELETE', '/gift');
      cy.authRequest('POST', '/gift', { giftAmount: 5 });

      cy.authRequest('GET', '/gift/code')
          .then((response) => {
            expect(response.body.content).to.have.length(10);
            expect(response.body.content).to.match(/\d/);
          });
    });
  });

  describe('PATCH /gift/:id', () => {
    it('should fail if wrong param', () => {
      cy.authRequest('PATCH', '/gift/1', {}, false)
          .then((response) => {
            expect(response.body.content)
                .to.equal(
                    'Bad Parameter Error: checkedOut must be of type Boolean',
                );
          });
    });

    it('should fail if gift code has not been played', () => {
      cy.createGifts(5);

      cy.fixture('defaultEmployee').then((employee) => {
        cy.login(employee);

        cy.authRequest('GET', '/gift').then((response) => {
          const gift = response.body.content[0];

          cy.authRequest('PATCH', `/gift/${gift.id}`, {
            checkedOut: gift.checkedOut,
          }, false)
              .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.content).to.equal(
                    'You can not checkout a gift that doesn\`t have a UserId',
                );
              });
        });
      });
    });


    it('should mark the gift as checkedOut', () => {
      cy.createGifts(5);

      cy.fixture('defaultEmployee').then((employee) => {
        cy.login(employee);

        // Pick a code from existing gift
        cy.pickCode().then((response) => {
          const code = response.body.content;
          // Play the code so the user is associated to the gift
          cy.submitCode(code)
              .then((response) => {
                const gift = response.body.content;
                // Mark the gift as checkedOut
                cy.authRequest('PATCH', `/gift/${gift.id}`, {
                  checkedOut: gift.checkedOut,
                }).then((response) => {
                  expect(response.status).to.equal(200);
                });
              });
        });
      });
    });
  });

  describe('DELETE /gift', () => {
    it('should delete all gifts', () => {
      cy.createGifts(5);

      cy.authRequest('DELETE', '/gift').then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.content).to.equal('All gifts have been deleted');
      });

      cy.authRequest('GET', '/gift').then((response) => {
        expect(response.body.content).to.have.length(0);
      });
    });
  });

  describe('DELETE /gift/:id', () => {
    it('should fail if no gift founded', () => {
      cy.authRequest('DELETE', '/gift/1', {}, false).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it('should delete a gift', () => {
      cy.createGifts(5);

      cy.authRequest('GET', '/gift').then((response) => {
        const gift = response.body.content[0];
        cy.authRequest('DELETE', `/gift/${gift.id}`).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.content).to.equal('Gift supprimé');
        });
      });
    });
  });
});
