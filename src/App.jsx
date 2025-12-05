import Form from "./components/Form";

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-orange-50 py-10">
      <div className="flex justify-center items-center mb-20">
        <img src="/logo.png" className="w-24" />
        <h1 style={{ fontFamily: "Fredoka One" }} className="uppercase text-center text-3xl text-orange-400">
          student travel buddy
        </h1>
      </div>
      <Form />
    </div>
  );
}
