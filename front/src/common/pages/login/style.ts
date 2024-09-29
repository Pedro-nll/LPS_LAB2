import styled from 'styled-components'

type SpaceProps = {
    value : number | null
}

export const Title = styled.h1`
    text-align: center;
    font-weight: bold;
    font-size: x-large;
`

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    background-color: white;
    box-shadow: 0 0 0 4px white, 0 0 15px rgba(0, 0, 0, 0.3); 
    border-radius: 8px; 
    padding: 25px 25px 300px 25px;
`
export const Space = styled.div<SpaceProps>`
    margin-bottom: ${(props) => props.value || '20'}px;
`
