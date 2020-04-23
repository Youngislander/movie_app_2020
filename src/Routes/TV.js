import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loader from "Components/Loader"
import {tvApi} from "../api";
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
 const[airingToday, setAiringToday] = useState([]);
 const[popular, setPopular] = useState([]);
 const[topRated, setTopRated] = useState([]);

 async function getTV (){
   try{
       const {
           data:{results: airingToday}
       } = await tvApi. airingToday();
       setAiringToday(airingToday);

       const {
           data:{results:popular}
       } = await tvApi.popular();
       setPopular(popular);

       const {
           data:{results:topRated}
       } = await tvApi.topRated();
       setTopRated(topRated);

   } catch(error){
       console.log(error);
   } finally {
     setLoading(false);
   }
 };
 useEffect( () =>{
    getTV(); 
   },[])   
return loading ? (<Loader />):(
    <Container>

     <IContainer>
      <H1>On air</H1>
      <Item>  
        {airingToday.map(now=> (<Poster key={now.id} id={now.id} imageUrl={now.poster_path} title={now.original_name} rating={now.vote_average} year={now.first_air_date&&now.first_air_date.substring(0.4)} isMovie={false} />))}
      </Item>
      </IContainer>

     <IContainer>
      <H1>Top rated</H1>
      <Item>  
      {topRated.map(top=> (<Poster key={top.id} id={top.id} imageUrl={top.poster_path} title={top.original_name} rating={top.vote_average} year={top.first_air_date&&top.first_air_date.substring(0.4)} isMovie={false} />))}
      </Item>
     </IContainer>

     <IContainer>
      <H1>Popular</H1>
      <Item>  
       {popular.map(pop=> (<Poster key={pop.id} id={pop.id} imageUrl={pop.poster_path} title={pop.original_name} rating={pop.vote_average} year={pop.first_air_date&&pop.first_air_date.substring(0.4)} isMovie={false} />))}
      </Item>
     </IContainer>
    </Container>  
)
}