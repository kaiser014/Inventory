<?php

namespace App\Http\Requests;

// use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class StoreSalesManagerRequest extends FormRequest
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
            'bio' => 'max:1000',
            'landmark' => 'max:255',
            'photo' => 'required',
            'nid_photo' => 'required',
            'nid' => 'required|min:8|numeric',
            'shop_id' => 'required|numeric',
            'password' => [
                'required',
                'min:8',             // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
            ],
        ];

    }
}
