import { NextPage } from "next";
import { useState } from "react";

const InputBox: NextPage = () => {
  // TODO: 変更後に絞り込み機能が走るように紐づけ
  const [userInput, setUserInput] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserInput(event.target.value as string);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="絞り込み"
        value={userInput}
        onChange={handleChange}
      />
    </form>
  );
};

export default InputBox;
