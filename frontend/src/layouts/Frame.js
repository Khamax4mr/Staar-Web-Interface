import {Box} from '@mui/material';
import styled from '@emotion/styled';

const Frame = styled(Box)({
  maxHeight: '100vh',
  padding: '72px 0px 28px 0px',
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const Container = styled(Box)({
  display: 'flex',
});

export {Frame, Container};