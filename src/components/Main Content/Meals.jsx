import { useEffect, useState } from "react";

import MealItem from "./MealItem";
import Card from "../UI Elements/Card";

import classes from "./Meals.module.css";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch(
          "https://react-https-nakul-default-rtdb.firebaseio.com/meals.json"
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Something unexpected happened!");
        }

        const fetchedMealsList = [];
        for (const key in data) {
          fetchedMealsList.push(data[key]);
        }
        setMeals(fetchedMealsList);
      } catch (err) {
        setHasError(true);
      }
      setIsFetching(false);
    }
    fetchMeals();
  }, []);

  return (
    <section className={classes["meals"]}>
      <Card>
        {isFetching && <h1>Loading...</h1>}
        {hasError && (
          <h1 className={classes["error-text"]}>
            Meals list could not be fetched!
          </h1>
        )}
        <ul>
          {meals.map((meal) => {
            return (
              <MealItem
                key={meal.id}
                id={meal.id}
                title={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
}

export default Meals;
