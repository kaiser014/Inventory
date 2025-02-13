<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use App\Manager\ImageManager;
use App\Manager\PriceManager;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailsListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' =>$this->id,
            'name' =>$this->name,
            'photo' =>ImageManager::prepareImageUrl(ProductPhoto::PHOTO_UPLOAD_PATH_THUMB, $this->photo),
            'brand' =>$this->brand?->name,
            'category' =>$this->category?->name,
            'sub_category' =>$this->sub_category?->name,
            'supplier' =>$this->supplier?->name,
            // 'original_price' => $this->price,
            'cost' =>$this->cost . PriceManager::CURRENCY_SYMBOL,
            'price' => number_format($this->price) . PriceManager::CURRENCY_SYMBOL,
            'selling_price' => PriceManager::calculate_sell_price($this->price, $this->discount_percent, $this->discount_fixed, $this->discount_start, $this->discount_end),
            'quantity' =>$this->quantity,
            'sku' =>$this->sku,
            'discount_fixed' => $this->discount_fixed,
            'discount_percent' => $this->discount_percent,
            'discount_start' => $this->discount_start ? Carbon::create($this->discount_start)->toDayDateTimeString() : '',
            'discount_end' => $this->discount_end ? Carbon::create($this->discount_end)->toDayDateTimeString() : '',
        ];
    }
}
