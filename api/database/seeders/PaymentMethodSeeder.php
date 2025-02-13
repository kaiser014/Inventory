<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payment_methods = [
            [
                'name' => 'Cash',
                'status' => 1,
                'account_number' => '',
            ],
            [
                'name' => 'Bkash',
                'status' => 1,
                'account_number' => '01676118092',
            ],
            [
                'name' => 'Nagad',
                'status' => 1,
                'account_number' => '01676118092',
            ],
            [
                'name' => 'Rocket',
                'status' => 1,
                'account_number' => '01676118092',
            ],
        ];
       PaymentMethod::insert($payment_methods);
    }
}
