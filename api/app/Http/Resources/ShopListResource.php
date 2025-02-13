<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Manager\ImageManager;
use App\Models\Shop;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopListResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'details' => $this->details,
            'status' => $this->status == Shop::STATUS_ACTIVE ? Shop::STATUS_ACTIVE_TEXT : Shop::STATUS_INACTIVE_TEXT,
            'logo' => ImageManager::prepareImageUrl(Shop::LOGO_UPLOAD_PATH_THUMB, $this->logo),
            'logo_full' => ImageManager::prepareImageUrl(Shop::LOGO_UPLOAD_PATH, $this->logo),
            'created_by' => $this->user?->name,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not Updated Yet',
            'address' => new AddressListResource($this->address)
        ];
    }
}
