import Form from "./components/Form";

export default function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center  min-h-screen w-full overflow-x-hidden
    bg-fixed
    bg-[radial-gradient(circle_at_center,_#FFB836_0%,_#FFE6B8_35%,_#FFF7EA_60%,_white_100%)] py-10">
        <div className="flex justify-center items-center mb-20">
          <img src="/logo.png" className="w-24" />
          <h1 style={{ fontFamily: "Fredoka One" }} className="uppercase text-center text-3xl text-orange-400">
            student travel buddy
          </h1>
        </div>
        <Form />
      </div>
    </>
  );
}
