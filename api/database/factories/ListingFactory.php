<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ListingFactory extends Factory
{
    protected $model = Listing::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraphs(3, true),
            'price' => $this->faker->randomFloat(2, 10, 10000),
            'category_id' => Category::factory(),
            'user_id' => User::factory(),
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'contact_info' => $this->faker->phoneNumber(),
            'status' => $this->faker->randomElement(['active', 'inactive', 'sold'])
        ];
    }

    public function active(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'active'
            ];
        });
    }

    public function inactive(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'inactive'
            ];
        });
    }

    public function sold(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'sold'
            ];
        });
    }
}
