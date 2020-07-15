import "./styles/App.css";
import { Layout, Row } from "antd";
import React, { Component }from "react";
import { openLink } from "./util";
import Details from "./Details.js"
//import DisplayGallery from "./DisplayGallery.js"
import {useTranslation, Trans } from "react-i18next";
import i18next from 'i18next';
import TestCard from "./TestCard.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
  HashRouter
} from "react-router-dom";
export default function App() {
    const { t, i18n } = useTranslation();
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
      };
    
  return (
    <Router>
          <div className="navigation">
      <Link to="/" className="item">2020</Link>
       <Link to="/gallery2019" className="item">2019</Link>
       <Link to="/about" className="item">about</Link>
       <a href="https://p5js.org">p5.js</a>            <div className="right">
            <button onClick={() => changeLanguage('es')}>es</button>
            <button onClick={() => changeLanguage('en')}>en</button>
            </div>
          </div>
    <Switch>
    <Route exact path="/" children={<Gallerytwenty />}/>
    <Route exact path="/es" children={<Gallerytwenty />}/>
    <Route exact path="/gallery2019" children={<Gallerynineteen/>} />
     <Route path="/2019/:id" children={<DetailedPage />}/>
    <Route exact path="/about" children = {<About />}/>
    </Switch>{" "}
    </Router>
  );
}

function About(){
  var Markdown = require('react-markdown');
  const { t, i18n } = useTranslation();
  return(
    <div className="home1">
    <img src="/images/asterisk-01.png" alt="p5.js asterisk"/>
    <div className="home">
    <h1>{t('About')}</h1>
    <p><Markdown source = {t('AboutIntro')}/></p>
    </div>
    </div>
  );
}

function Gallerynineteen(){
  const { t, i18n } = useTranslation();
return(      
  <div className="body">
    <h1>p5.js 2019 Showcase!</h1>
      <Trans i18nKey="Curated by">
          <p>
            Curated by{" "}<a target="_blank" rel="noopener noreferrer" href="https://ashleykang.dev/" >Ashley Kang</a>{" "}in the summer of 2019, below is the first ever curated collection of the p5.js showcase! We compiled different ways to use p5.js and learn more about each one by clicking on it.
         </p>
         </Trans>
         <div class="row">
      {t('showcase', {returnObjects: true}).map(({id, title, author, description, image})=>(
         <Link
         key={id}
         to={{
           pathname: `/2019/${id}/`,
         }}
       >
        <TestCard key={`card-${id}`} 
        title={title} 
        author={author} 
        description={description} 
        image={image}/>
        </Link>
      ))}
      </div>
     </div>
  );
}

function Gallerytwenty() {
  const { t, i18n } = useTranslation();
return(
  <div className="body">
    <h1>{t('Welcome')}</h1>
    <h2>Full version is coming out at the end of August!</h2>
    </div>
  );
}

function DetailedPage() {
  let { id } = useParams();
  let entries= i18next.t('showcase', { returnObjects: true });
  let piece = entries.find(x=> x.id === id);

  if (!piece) return <div>Image not found</div>;

  return (
    <Details
    piece={piece}
    />
  );
}
