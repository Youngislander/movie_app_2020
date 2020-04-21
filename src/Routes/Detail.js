import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loader from "Components/Loader"
import {moviesApi, tvApi} from "../api";
import styled from "styled-components"

const Data = styled.div`
width: 70%;
margin-left:10px;
`

const Container = styled.div`
color:white;
margin-top: 60px;
`;
const BackDrop = styled.span`
 width:100%;
 height:100px;
`;
const Content = styled.span``;
const Cover = styled.span``;
const Title = styled.span``;
const ItemContainer = styled.div``;
const Item = styled.span``;
const Divider = styled.span``;
const Overview= styled.p``

export default ({
    match:{params:{id}},
history:{push},
location:{pathname}
}) => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMovie, setIsmovie] = useState(pathname.includes("movie"))
  const parsedId = parseInt(id);
 
  if(isNaN(parsedId)){
      return push("/")
  }

  async function getResult (){
    console.log(pathname);
  try{
     if(isMovie){
       const {data} = await moviesApi.movieDetail(parsedId);
       setResult(data)
     } else{
         const {data} = await tvApi.showDetail(parsedId);
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
          <BackDrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
          <Content>
              <Cover bgImage={result.poster_path?`http://image.tmdb.org/t/p/original${result.poster_path}`:require("./noPosterSmall.png")} />  
           <Data>
            <Title>
                {result.original_title? result.original_title:result.original_name}
            </Title>
            <ItemContainer>
                <Item>{result.release_date && result.release_date ? result.release_data : result.first_air_date}</Item>
                <Divider> / </Divider>
                <Item>
                  {result.genres && result.genres.map((genre, index)=> index=== result.genres.length -1? genre.name:`${genre.name} /`)}
                </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
           </Data>
          </Content>
        </Container>    
  )  
}

