import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loader from "Components/Loader"
import {moviesApi, tvApi} from "../api";
import styled from "styled-components"

const Container = styled.div`
height: calc(100vh - 50px);
width: 100%;
position: relative;
padding: 50px;
background-color: transparent;
`;

const Content = styled.span`

height: calc(100vh -20px);
 display:flex;
 widht:100%;
 position: relative;
 height: 100%;
 background-color: transparent;
 border-radius: 4px;
 margin-top: 40px;
`;

const Data = styled.div`
flex-wrap: wrap;
display:block;
width: 70%;
margin-left:10px;
color:white;
background-color: transparent;
padding: 0 10px;
border-radius : 4px;
`


const BackDrop = styled.span`
 position: absolute;
 top:0;
 left:0; 
 width:100%;
 height:100%;
 background-image: url(${props => props.bgImage});
 background-position : center center;
 background-size : cover;
 filter: blur(3px);
 opacity: 0.5;
`;
const Cover = styled.span`
  width: 30%;
  background-image:url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;
const Title = styled.span`
font-size: 58px;
background-color: transparent;

`;

const UnderT =styled.span`
display: block;
height:99%;
padding: 0px 10px;
background-color: rgba(20,20,20,0.8);
box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.8);
`

const ItemContainer = styled.div`
margin-top:20px;
background-color:transparent;
`;

const Item = styled.span`
margin-top:20px;
background-color:transparent;
`;
const Divider = styled.span`
background-color:transparent;
`;
const Overview= styled.p`
margin-top: 20px;
background-color:transparent;
`

export default ({
    match:{params:{id}},
history:{push},
location:{pathname}
}) => {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMovie, setIsmovie] = useState(pathname.includes("movie"))
  const parsedId = parseInt(id);
 
  if(isNaN(parsedId)){
      return push("/")
  }

  async function getResult (){
  try{
     if(isMovie){
       const {data} = await moviesApi.movieDetail(parsedId);
       setResult(data)
     } else{
        const {data} = await tvApi.tvDetail(parsedId);
        setResult(data)
     }
    } catch{
       setError("Cant find any results")
       console.log(error);
     } finally{
       setLoading(false)
     }
   };
   useEffect(()=>{
       getResult()
 },[])

  return loading ? (<Loader />):(
        <Container>
          <BackDrop bgImage={ result.backdrop_path ? `http://image.tmdb.org/t/p/original${result.backdrop_path}`:require("./noPosterSmall.png")} />
          <Content>
              <Cover bgImage={result.poster_path?`http://image.tmdb.org/t/p/original${result.poster_path}`:require("./noPosterSmall.png")} />  
           <Data>
             <UnderT>
             <Title>
                {result.original_title? result.original_title:result.original_name}
            </Title>
              <ItemContainer>
                 <Item>{result.release_date ? result.release_date : result.first_air_date}</Item>
                 <Divider> / </Divider>
                 <Item>
                  {result.genres && result.genres.map((genre, index)=> index=== result.genres.length -1? genre.name:`${genre.name} /`)}
                 </Item>
               </ItemContainer>
              <Overview>{result.overview}</Overview>
           </UnderT>
           </Data>
          </Content>
        </Container>    
  )  
}

