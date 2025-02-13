<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreShopRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'address' => 'required|min:3|max:255',
            'division_id' => 'required|numeric',
            'district_id' => 'required|numeric',
            'area_id' => 'required|numeric',
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'name' => 'required|min:3|max:255',
            'details' => 'max:1000',
            'landmark' => 'max:255',
            'logo' => 'required',
        ];
    }
}
