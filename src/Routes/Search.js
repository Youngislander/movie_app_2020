import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loader from "Components/Loader";
import Poster from "Components/Poster";
import Error from "Components/Error";
import {moviesApi, tvApi} from "../api";
import styled from "styled-components"

const Container = styled.div`
  margin-top: 70px;
  margin-left: 15px;
  color : white;
  `

const Section= styled.div`
margin-top:45px;
display : block;
`
  
const Form= styled.form``

const Input = styled.input`
  all:unset;
  width: 100%;
  font-size: 28px;
`
const Item = styled.span`
  display : grid;
  grid-template-columns: repeat(auto-fill, 125px);
`
const Title = styled.span`
  font-size : 20px;
  padding: 5px;
  border-bottom : 1px solid #F7DC6F;
  margin-bottom : 30px;
  `
const Content = styled.div`
display: block;
 margin-top : 30px;
`

const TV = styled.div`
margin-bottom : 10px;
`

const Movie = styled.div`
 margin-top : 30px;
`

export default () => {
 const[loading, setLoading] = useState(true);
 const[movieResults, setMovie] = useState([]);
 const[tvResults, setTV] = useState([]);
 const[searchTerm, setTerm] = useState("");
 const[error, setError] = useState(null)

 const handleSubmit = event =>{
     event.preventDefault();  
     if(searchTerm !==""){
         searchByTerm();
     } 
 }

 const updateTerm = event => {
   const{
     target: {value}
   } = event;
   setTerm(value);
 }

 async function searchByTerm (){
   try{
       const {
           data:{results : movieResults}
       } = await moviesApi.search(searchTerm);
       setMovie(movieResults);

       const {
           data:{results:tvResults}
       } = await tvApi.search(searchTerm);
       setTV(tvResults);
   } catch(error){
      setError("Nothing found");
   } finally {
     setLoading(false);
   }
 };
 useEffect( () =>{
    searchByTerm(); 
   },[])   
return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input placeholder="Search Movies or TV Shows.." values={searchTerm} onChange={updateTerm} />
      </Form>
      <Content>
       {loading? (<Loader />):(
         <>
         <TV>
         {tvResults && tvResults.length>0&&(
           <>
          <Title>TV shows : {tvResults.length}</Title> 
           <Section title="TV shows Results">
            <Item>  
             {tvResults.map(top=> (<Poster key={top.id} id={top.id} imageUrl={top.poster_path} title={top.original_name} rating={top.vote_average} year={top.first_air_date&&top.first_air_date.substring(0.4)} isMovie={false} />))}
            </Item>
            </Section>
            </> 
         )}
          </TV>

          <Movie>
           {movieResults && movieResults.length > 0 &&(
           <>
            <Title>Movie shows : {movieResults.length}</Title> 
            <Section title="Movie Results">
              <Item>  
              {movieResults.map(now=> (<Poster key={now.id} id={now.id} imageUrl={now.poster_path} title={now.original_title} rating={now.vote_average} year={now.release_date.substring(0.4)} isMovie={true} />))}
               </Item>
            </Section>
           </>
         )}
           </Movie>
         {searchTerm !== "" && error && movieResults && tvResults && movieResults.length === 0 &&tvResults.length === 0 && <Error text={error}/>}
         </>
       )
      }
      </Content>
    </Container>    
)
}