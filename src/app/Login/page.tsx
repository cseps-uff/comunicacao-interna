export default function Login(){
  return(
    <div className="conteiner">
      <section id="login">
        {/* <h2>Login</h2> */}
        <form action="#">
          <label htmlFor="t1">Email:</label>
          <br />
          <input type="text" name="email" id="t1" placeholder="Seu melhor email..." required/>

          <br />

          <label htmlFor="t2">Senha</label>
          <br />
          <input type="text" name="senha" id="t2" placeholder="Tipo: Isac22052007..." required/>
        </form>
      </section>
    </div>
  )
}
/* Acesso é feito pelo caminho: localhost:o-num-da-porta/NovaRota */