import { styled } from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
`;


export const Card = styled.div`
  display: flex;
  justify-content: space-btween;
  background-color: #fff;
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
`

export const Colum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

export const Image = styled.img`
 width: 70px;
  height: 70px;
  object-fit: cover;
`