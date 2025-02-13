<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierEditResource extends JsonResource
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
            'details' => $this->details,
            'email' => $this->email,
            'name' => $this->name,
            'phone' => $this->phone,
            'display_logo' => ImageManager::prepareImageUrl(Supplier::LOGO_UPLOAD_PATH_THUMB, $this->logo),
            'status' => $this->status,
            'address' => $this->address?->address,
            'division_id' => $this->address?->division_id,
            'district_id' => $this->address?->district_id,
            'area_id' => $this->address?->area_id,
            'landmark' => $this->address?->landmark,
        ];
    }
}
