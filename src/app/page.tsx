import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "Página inicial",
}

export default function Home(){
  return(
    <div>
      <h1>Isso é uma h1</h1>
    </div>
  )
}