import {AppBar, MenuList, MenuItem, Typography} from '@mui/material';
import styled from '@emotion/styled';

const Container = styled(AppBar)({
  position: 'fixed',
  backgroundColor: 'skyblue',
  borderBottom: '2px gray solid',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
});

const Title = styled(Typography)({
  padding: '8px',
});

const Bar = styled(MenuList)({
  padding: 0,
});

const Button = styled(MenuItem)({
  display: 'inline-flex',
  padding: '4px 16px 4px 16px',
  fontSize: '14px',
});

export {Container, Title, Bar, Button};