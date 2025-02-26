<?php

namespace App\Http\Resources;

use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use App\Manager\ImageManager;
use App\Manager\PriceManager;
use Illuminate\Support\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return[
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => number_format($this->price) . PriceManager::CURRENCY_SYMBOL,
            'original_price' => $this->price,
            'selling_price' => PriceManager::calculate_sell_price($this->price, $this->discount_percent, $this->discount_fixed, $this->discount_start, $this->discount_end),
            'cost' => $this->cost . PriceManager::CURRENCY_SYMBOL,
            'sku' => $this->sku,
            'stock' => $this->stock,
            'status' => $this->status == Product::STATUS_ACTIVE ? 'Active' : 'Inactive',
            'discount_fixed' => $this->discount_fixed . PriceManager::CURRENCY_SYMBOL,
            'discount_percent' => $this->discount_percent . PriceManager::PERCENTAGE,
            'description' => $this->description,
            'discount_start' => $this->discount_start != null ? Carbon::create($this->discount_start)->toDayDateTimeString() : null,
            'discount_end' => $this->discount_end != null ? Carbon::create($this->discount_end)->toDayDateTimeString() : null,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not Updated Yet',

            'category' => $this->category?->name,
            'sub_category' => $this->sub_category?->name,
            'supplier' => $this->supplier ? $this->supplier?->name . '-' . $this->supplier?->phone : null,
            // 'country' => $this->country?->name,
            'created_by' => $this->created_by?->name,
            'updated_by' => $this->updated_by?->name,
            'primary_photo' => ImageManager::prepareImageUrl(ProductPhoto::PHOTO_UPLOAD_PATH_THUMB, $this->primary_photo?->photo),

            'attributes' => ProductAttributeShowListResource::collection($this->product_attributes),
        ];
    }
}
