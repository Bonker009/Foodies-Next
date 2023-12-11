import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/Meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

export const metadata = {
  title: 'All Meals',
  description: 'Delicious meals, shared by a food-loving community.',
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
export default async function MealPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>By you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href='/meals/share'>Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={
            <div className={classes['loading-container']}>
              <div className={classes['loading-spinner']}></div>
              <p>Loading...</p>
            </div>
          }
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
