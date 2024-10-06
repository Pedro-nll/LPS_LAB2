import styled from 'styled-components'

type SpaceProps = {
    value?: number
}

type ContainerProps = {
    size?: number
}

type SizedProps = {
    height?: string
    width?: string
}

export const Title = styled.h1`
    text-align: center;
    font-weight: bold;
    font-size: x-large;
`

export const Container = styled.div<ContainerProps>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid;
    backdrop-filter: blur(30px);
    border-radius: 8px; 
    padding: 25px 25px ${props => props.size || 0}px 25px;

`
export const Space = styled.div<SpaceProps>`
    margin-bottom: ${(props) => props.value || '20'}px;
`
export const Subtitle = styled.h2`
    font-size: larger;
    font-weight: bold;
    margin-bottom: 10px
`

export const TwoParts = styled.div`

    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Dois itens por linha */
    grid-auto-rows: minmax(100px, auto); /* Altura mínima para os itens */
    gap: 30px;
    width: 663px;

    // display: flex;
    // gap: 30px;
    // justify-content: center;
    // align-items: center;
    // flex-wrap: wrap;
    // flex: 0 0 48%;
    // margin: 1%;
`

export const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
export const Sized = styled.div<SizedProps>`
    width: ${props => props.width || 0};
    height: ${props => props.height || 0};
`

export const CenterFlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    padding: 25px 25px 25px 25px;
    border-radius: 8px;
    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

`

export const FlexColum = styled.div`
    display: flex;
    flex-direction: column;
`