import {Box, Typography} from '@mui/material';
import styled from '@emotion/styled';

const Frame = styled(Box)({
  padding: '64px, 8px, 8px, 8px',
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const Container = styled(Box)({
  margin: '8px 0px 8px 0px',
  display: 'flex',
});

const Title = styled(Typography)({
  placeContent: 'center',
  fontSize: '18px',
});

export {Frame, Container, Title};
