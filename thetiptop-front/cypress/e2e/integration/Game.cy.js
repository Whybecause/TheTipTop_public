describe('game', () => {
  before(() => {
    // We reregister the default user account
    // Because Auth.cy.js delete all user account on init
    cy.fixture('defaultUser').then((user) => {
      cy.register(user);
    });
  });
  beforeEach(() => {
    cy.loginAdmin();
    cy.authRequest('DELETE', '/game');
  });

  const apiUrl = Cypress.env('DEV_API');
  const gameUrl = `${apiUrl}/game`;

  describe('POST /game - Create game', () => {
    it('should not allow to create a game if not logged in', () => {
      cy.request({
        method: 'POST',
        url: gameUrl,
        failOnStatusCode: false,
      })
          .then((response) => {
            expect(response.status).to.equal(401);
          });
    });

    it('should not allow to create a game if role = USER', () => {
      cy.fixture('defaultUser').then((user) => {
        cy.login(user);
        cy.authRequest('POST', '/game', {}, false)
            .then((response) => {
              expect(response.status).to.equal(403);
            });
      });
    });

    it('should not allow to create a game if missing params', () => {
      cy.authRequest('POST', '/game', {}, false)
          .then((response) => expect(response.status).to.equal(400));
    });

    it('should create game', () => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      cy.authRequest('POST', '/game', { startDate, endDate })
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.content).to.have.ownProperty('startDate');
            expect(response.body.content).to.have.ownProperty('endDate');
          });
    });
  });

  describe('GET /game', () => {
    it('should fetch game without error even if no game created', () => {
      cy.request('GET', gameUrl)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.content).to.be.null;
          });
    });

    it('should fetch game', () => {
      cy.createGame();

      cy.request('GET', gameUrl)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.content).to.have.ownProperty('startDate');
            expect(response.body.content).to.have.ownProperty('endDate');
          });
    });
  });

  describe('PATCH /game - Update game end date', () => {
    it('should fail if wrong params', () => {
      cy.createGame();

      cy.authRequest('PATCH', '/game', 'wrongValue', false)
          .then((response) => expect(response.status).to.equal(400));
      cy.authRequest('PATCH', '/game', { endDate: 'coucou' }, false)
          .then((response) => expect(response.status).to.equal(500));
    });

    it('should update endDate', () => {
      cy.createGame();

      const endDate = new Date('august 19, 3001');

      cy.authRequest('PATCH', '/game', { endDate })
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(new Date(response.body.content.endDate))
                .to.deep.equal(endDate);
          });
    });
  });

  describe('PATCH /end - End the current game', () => {
    it('should fail if no game created', () => {
      cy.loginAdmin();
      cy.authRequest('PATCH', '/game/end', {}, false)
          .then((response) => {
            expect(response.status).to.equal(404);
          });
    });

    it('should end the game', () => {
      cy.createGame();

      cy.fixture('defaultAdmin').then((admin) => {
        cy.login(admin);
        cy.authRequest('PATCH', '/game/end')
            .then((response) => {
              expect(response.status).to.equal(200);
              expect(new Date(response.body.content.endDate))
                  .to.be.lessThan(new Date());
            });
      });
    });
  });

  describe('DELETE /game', () => {
    it('should delete the game', () => {
      cy.createGame();

      cy.loginAdmin();
      cy.authRequest('DELETE', '/game')
          .then((response) => {
            expect(response.status).to.equal(200);
          });
    });
  });

  describe('PATCH /game/winner - Define a winner from players', () => {
    it('should fail if no game created', () => {
      cy.loginAdmin();
      cy.authRequest('PATCH', '/game/winner', {}, false)
          .then((response) => {
            expect(response.status).to.equal(400);
          });
    });

    it('should fail if game not ended', () => {
      cy.createGame();
      cy.loginAdmin();

      cy.authRequest('PATCH', '/game/winner', {}, false)
          .then((response) => expect(response.status).to.equal(400));
    });

    it('should fail if no player', () => {
      cy.createEndedGame();
      cy.deleteGifts();
      cy.loginAdmin();
      cy.authRequest('PATCH', '/game/winner', {}, false)
          .then((response) => expect(response.status).to.equal(404));
    });

    it('should set the winner', () => {
      cy.createEndedGame();

      cy.createGifts(5);

      cy.pickCode().then((response) => {
        cy.submitCode(response.body.content);

        cy.loginAdmin();
        cy.authRequest('PATCH', '/game/winner').then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.content.isWinner).to.equal(true);
        });
      });
    });
  });

  describe('GET /game/winner - Find the current winner', () => {
    it('should fetch the winner', () => {
      cy.fixture('defaultUser').then((user) => {
        cy.createGifts(5);
        cy.pickCode().then((response) => {
          cy.submitCode(response.body.content, user);
        });

        cy.createEndedGame();
        cy.setWinner();

        cy.request({
          method: 'GET',
          url: `${gameUrl}/winner`,
        }).then((response) => {
          expect(response.body.content.isWinner).to.equal(true);
        });
      });
    });
  });

  describe('PATCH /game/reset-winner - Reset current winner', () => {
    it('should reset the winner', () => {
      cy.loginAdmin();
      cy.authRequest('PATCH', '/game/reset-winner').then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.content).to.deep.equal({});
      });

      cy.authRequest('GET', '/user').then((response) => {
        const users = response.body.content;
        for (const user of users) {
          expect(user.isWinner).to.equal(false);
        }
      });
    });
  });
});
