import {Box, Divider, Typography} from '@mui/material';
import styled from '@emotion/styled';

const Frame = styled(Box)({
  maxHeight: '100vh',
  padding: '72px 0px 28px 0px',
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const Title = styled(Typography)({
  minWidth: '160px',
  placeContent: 'center',
  fontSize: '18px',
});

const Container = styled(Box)({
  display: 'flex',
});

const ContainerDivider = styled(Divider)({
  margin: '8px 0px 8px 0px',
});

export {Frame, Title, Container, ContainerDivider};