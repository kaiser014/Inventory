<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockListResource extends JsonResource
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
            'id' => $this->id,
            'product_name' => $this->product?->name,
            'product_sku' => $this->product?->sku,
            'existing_stock' => $this->existing_stock,
            'add_stock' => $this->new_stock,
            'update_stock' => $this->updated_stock,
            'created_by' => $this->user?->name,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'New Added Stock Not Updated Yet',
        ];
    }
}
