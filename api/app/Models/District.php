<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getDistrictByDivisionId(int $division_id){
        return self::query()->select('id', 'name')->where('division_id', $division_id)->get();
    }

}
