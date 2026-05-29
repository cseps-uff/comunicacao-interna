"use client"; // Essa diretiva é necessária no Next.js pois temos interatividade na tela (clicks e estados)

import { useState } from "react";
import Link from "next/link";
import './newslatter.css';

export default function Newsletter() {
  return (
    <div className="main#box">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia placeat eos suscipit! Incidunt deserunt ipsa reiciendis obcaecati saepe vitae commodi nobis molestiae nisi. Dolor laboriosam, facere quaerat ipsa rerum quae?</p>
    </div>
  );
}

