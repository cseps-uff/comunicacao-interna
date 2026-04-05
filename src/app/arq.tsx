
export default function Login() {
  return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center justify-center border-8 border-white h-140 w-140 bg-black rounded-2xl">
          <div className="flex flex-col items-center h-130 w-130 bg-white pt-6">

            <header className="flex h-20 w-120 bg-black text-white text-3xl items-center justify-center"> SIGN-IN PAGE </header>

            <br />

            <div className="flex flex-col items-center justify-center h-90 w-120 bg-black">
              <input
                type="text"
                placeholder=" seuemail@gmail.com"
                className="h-10 w-90 bg-white rounded-2xl"
              />
              
              <br />

              <input
                type="text"
                placeholder=" password123"
                className="h-10 w-90 bg-white rounded-2xl"
              />

              <br />

              <button className="text-white h-10 w-20 bg-blue-700"> LOGIN </button>
              
            </div>
          </div>
        </div>  
      </div>
  );
}
