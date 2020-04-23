import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loader from "Components/Loader"
import {moviesApi} from "../api";
import styled from "styled-components";
import Poster from "Components/Poster";

const Container = styled.div`
  margin-top: 70px;
  margin-left: 15px;
  color : white;
`
const IContainer = styled.div`
  margin-top : 20px
`

const Item = styled.span`
  display : grid;
  grid-template-columns: repeat(auto-fill, 125px);
`

const H1 = styled.div`
  font-weigth : bold;
  font-size : 20px;
  margin-bottom : 20px;
  display: block;
  width:100%;
`
const Title = styled.span`
 font-size : 12px;
 text-align:left;
`


export default () => {
 const[loading, setLoading] = useState(true);
 const[nowPlaying, setNow] = useState([]);
 const[upComing, setUp] = useState([]);
 const[popular, setPopular] = useState([]);

 async function getMovies (){
   try{
       const {
           data:{results:nowPlaying}
       } = await moviesApi.nowPlaying();
       setNow(nowPlaying);

       const {
           data:{results:upComing}
       } = await moviesApi.upcoming();
       setUp(upComing);

       const {
           data:{results:popular}
       } = await moviesApi.popular();
       setPopular(popular);

   } catch(error){
       console.log(error);
   } finally {
     setLoading(false);
   }
 };
 useEffect( () =>{
    getMovies(); 
   },[])   
return loading ? (<Loader />):(
    <Container>

     <IContainer>
      <H1>Now playing</H1>
      <Item>  
        {nowPlaying.map(now=> (<Poster key={now.id} id={now.id} imageUrl={now.poster_path} title={now.original_title} rating={now.vote_average} year={now.release_date.substring(0.4)} isMovie={true} />))}
      </Item>
     </IContainer> 

     <IContainer>
      <H1>Upcoming</H1>
      <Item>  
        {upComing.map(now=> (<Poster key={now.id} id={now.id} imageUrl={now.poster_path} title={now.original_title} rating={now.vote_average} year={now.release_date.substring(0.4)} isMovie={true} />))}
      </Item>
     </IContainer> 

     <IContainer>
      <H1>Popular</H1>
      <Item>  
        {popular.map(now=> (<Poster key={now.id} id={now.id} imageUrl={now.poster_path} title={now.original_title} rating={now.vote_average} year={now.release_date.substring(0.4)} isMovie={true} />))}
      </Item>
     </IContainer> 

    </Container>    
)
}