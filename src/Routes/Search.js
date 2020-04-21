import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loader from "Components/Loader"
import {moviesApi, tvApi} from "../api";
import styled from "styled-components"

const Container = styled.div`
  margin-top: 70px;
  margin-left: 15px;
  color : white;
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
 const[movieResults, setMovie] = useState([]);
 const[tvResults, setTV] = useState([]);
 const[searchTerm, setTerm] = useState("");

 const handleSubmit =()=>{
     if(searchTerm !==""){
         searchByTerm();
     } 
 }

 async function searchByTerm (){
   try{
       const {
           data:{results : movieResults}
       } = await moviesApi.search(searchTerm);
       setMovie(movieResults);

       const {
           data:{results:tvResults}
       } = await tvApi.upcoming();
       setTV(tvResults);
   } catch(error){
       console.log(error);
   } finally {
     setLoading(false);
   }
 };
 useEffect( () =>{
    searchByTerm(); 
   },[])   
return loading ? (<Loader />):(
    <Container>
      <H1>Now playing</H1>
      <Item>  
      </Item>
    </Container>    
)
}