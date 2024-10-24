"use client";

import { FC } from "react";

import { ThemeToggle } from "@/components/global";

const HomePage: FC = () => {
  return (
    <section className="container">
      <ThemeToggle />

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim earum
        corporis nemo molestias numquam maxime nostrum minima quasi sint,
        suscipit amet labore quam accusamus deserunt dolorum reprehenderit
        commodi illo, quae debitis. Cumque repellendus, delectus saepe ad
        inventore excepturi facilis neque doloremque odio numquam nihil,
        accusantium, quaerat asperiores esse fugiat soluta!
      </p>
    </section>
  );
};

export default HomePage;
