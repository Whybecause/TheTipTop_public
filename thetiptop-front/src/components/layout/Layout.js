import React from 'react';
import PropTypes from 'prop-types';
import { Box, Center, Container, Text } from '@chakra-ui/react';

import NavWrapper from '../nav/NavWrapper';
import Footer from '../Footer';
import AdminSidebar from '../admin/sidebar/AdminSidebar';

const BasicLayout = ({
  pageTitle = '',
  width = '4xl',
  height =' 100vh',
  children,
  withDefaultPadding = false,
}) => {
  return (
    <Box as="main" bg='gray.50' minH={height}>
      <Container as="section"
        maxW={width}
        minH='inherit'
        display="flex"
        flexDirection="column"
        px={withDefaultPadding ? '1rem' : '0'}
      >
        {pageTitle ? (
          <Center>
            <Text as='h1' py='0.5em'>{pageTitle}</Text>
          </Center>
        ) : null}
        {children}
      </Container>
    </Box>
  );
};


BasicLayout.propTypes = {
  pageTitle: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  withDefaultPadding: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default function Layout({
  pageTitle = '',
  metaTitle = '',
  width = '4xl',
  height = '100vh',
  showAdminSidebar = false,
  withDefaultPadding = false,
  children,
}) {
  React.useEffect(() => {
    document.title = metaTitle;
  });

  let content = (
    <>
      <NavWrapper />
      <BasicLayout pageTitle={pageTitle} width={width} height={height}
        withDefaultPadding={withDefaultPadding}>
        {children}
      </BasicLayout>
      <Footer />
    </>
  );

  if (showAdminSidebar) {
    content = (
      <AdminSidebar>
        <BasicLayout
          pageTitle={pageTitle}
          width={width}
          height={height}
          withDefaultPadding={withDefaultPadding}
        >
          {children}
        </BasicLayout>
        <Footer />
      </AdminSidebar>
    );
  }

  return (<>{content}</>);
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
  metaTitle: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  showAdminSidebar: PropTypes.bool,
  withDefaultPadding: PropTypes.bool,
  children: PropTypes.node,
};
