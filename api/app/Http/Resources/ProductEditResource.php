<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductEditResource extends JsonResource
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
            'category_id' => $this->category_id,
            'sub_category_id' => $this->sub_category_id,
            'supplier_id' => $this->supplier_id,
            'brand_id' => $this->brand_id,
            'cost' => $this->cost,
            'price' => $this->price,
            'discount_fixed' => $this->discount_fixed,
            'discount_percent' => $this->discount_percent,
            'description' => $this->description,
            'discount_start' => $this->discount_start,
            'discount_end' => $this->discount_end,
            'sku' => $this->sku,
            'stock' => $this->stock,
            'status' => $this->status,
            'attributes' => $this->product_attributes,
            'specifications' => $this->product_specifications,
            // 'photos' => $this->product_photos,
            'attributes' => ProductAttributeListResource::collection($this->product_attributes),
        ];
    }
}
