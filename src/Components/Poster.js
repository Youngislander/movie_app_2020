import React from "react";
import {Link, withRouter} from "react-router-dom"
import styled from "styled-components";

const Container = styled.div`
  font-size : 12px;
  margin-left : 20px;
`
const Image = styled.div`
  background-image:url(${props => `https://image.tmdb.org/t/p/w300${props.bgUrl}`});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
`;

const Rating = styled.span``;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  &:hover {
      ${Image}{
          opacity: 0.3;
      }
  }
`

const Title = styled.span`
  display: block;
  margin-bottom: 3px; 
`

const Year = styled.span`
 font-size:10px;
 color:rgba(225,225,225,0.5);
`



const Poster = withRouter(({id, imageUrl, title, rating, year, isMovie})=>(
  <Link to={isMovie? `/movie/${id}` : `/tv/${id}`}>
   <Container>
     <ImageContainer>
         <Image bgUrl={imageUrl ? `${imageUrl}` : require("./noPosterSmall.png")} />
         <Rating>
             <span role="img" aria-label="rating">
                 💛
             </span>{" "}
             {rating}/10
         </Rating>
     </ImageContainer>
     <Title>{title.lenght >18 ? `${title.substring(0,18)}...`: title}</Title>
     <Year>{year}</Year>
  </Container>
  </Link>
)
)

export default Poster