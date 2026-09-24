<!DOCTYPE html>
<html>
<head>
    <title>Nouveau message de contact</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Nouveau message depuis votre portfolio</h2>
    <p>Vous avez reçu un nouveau message de <strong>{{ $name }}</strong> ({{ $email }}).</p>
    
    <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #4f46e5; background: #f9fafb;">
        <p style="margin: 0; white-space: pre-wrap;">{{ $content }}</p>
    </div>

    <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Vous pouvez répondre directement à cet email pour contacter {{ $name }}.
    </p>
</body>
</html>
