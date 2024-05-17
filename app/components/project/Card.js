import React, {useState, useEffect,useContext} from "react";
import axios from "axios";
import CardItem from "./CardItem";
import { MyContext } from "../MyContext";

function Card() {
  const { projects} = useContext(MyContext);
  return (
    <div className="row row-cols-3 row-cols-md-3 g-5 mt-4">
      {projects.map(project=>{
 return <CardItem project={project} key={project.id} />
      })}
    </div>
  );
}

export default Card;