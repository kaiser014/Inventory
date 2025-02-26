<?php

namespace App\Utility;

use Illuminate\Support\Carbon;

class Date{
    public static function calculate_discount_remaining_days($discount_end){
        $discount_remaining_days = 0;
        if($discount_end != null){
           $discount_remaining_days = Carbon::now()->diffInDays(Carbon::create($discount_end));
        }
        return $discount_remaining_days;
    }
    public static function calculate_discount_remaining_times($discount_end){
        $discount_remaining_times = 0;
        if($discount_end != null){
           $discount_remaining_times = Carbon::now()->diffInHours(Carbon::create($discount_end));
        }
        return $discount_remaining_times;
    }
}