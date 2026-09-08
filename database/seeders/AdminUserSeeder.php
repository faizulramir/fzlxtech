<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Create (or reset) the admin user with a fresh random password.
     *
     * The password is printed to the console — it is the only copy,
     * so save it immediately. Re-running this seeder rotates the password.
     */
    public function run(): void
    {
        $password = Str::password(20);

        $user = User::updateOrCreate(
            ['email' => 'admin@fzlxtech.cloud'],
            [
                'name' => 'Admin',
                'password' => $password,
                'email_verified_at' => now(),
            ]
        );

        // Ensure 2FA leftovers from a previous account can't lock anyone out.
        $user->forceFill([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ])->save();

        $this->command->info('Admin user ready: admin@fzlxtech.cloud');
        $this->command->warn("Password: {$password}");
    }
}
