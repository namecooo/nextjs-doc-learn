import { Counter } from "../components/Counter";

const Page = () => {
  console.log("Server");

  return (
    <div className="m-10">
      <Counter />
    </div>
  );
};

export default Page;
