import {Box, Divider, Typography} from '@mui/material';
import styled from '@emotion/styled';

const Frame = styled(Box)({
  padding: '72px 8px 8px 8px',
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const Container = styled(Box)({
  display: 'flex',
});

const ContainerDivider = styled(Divider)({
  margin: '8px 0px 8px 0px',
});

const Title = styled(Typography)({
  minWidth: '160px',
  placeContent: 'center',
  fontSize: '18px',
});

export {Frame, ContainerDivider, Container, Title};
