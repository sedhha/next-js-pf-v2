export const htmlTemplate = (
	name: string,
	email: string,
	subject: string,
	message: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>New Contact Form Submission</title>
	<style>
		body {
			margin: 0;
			padding: 0;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			min-height: 100vh;
		}
		
		.container {
			max-width: 600px;
			margin: 40px auto;
			background: #ffffff;
			border-radius: 16px;
			box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
			overflow: hidden;
		}
		
		.header {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			padding: 40px 30px;
			text-align: center;
			position: relative;
			overflow: hidden;
		}
		
		.header::before {
			content: '';
			position: absolute;
			top: -50%;
			left: -50%;
			width: 200%;
			height: 200%;
			background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E");
			animation: float 20s ease-in-out infinite;
		}
		
		@keyframes float {
			0%, 100% { transform: translateY(0px) rotate(0deg); }
			50% { transform: translateY(-20px) rotate(180deg); }
		}
		
		.header h1 {
			color: #ffffff;
			margin: 0;
			font-size: 28px;
			font-weight: 700;
			position: relative;
			z-index: 1;
		}
		
		.header .subtitle {
			color: rgba(255, 255, 255, 0.9);
			margin: 8px 0 0 0;
			font-size: 16px;
			font-weight: 400;
			position: relative;
			z-index: 1;
		}
		
		.content {
			padding: 40px 30px;
		}
		
		.field-group {
			margin-bottom: 32px;
			position: relative;
		}
		
		.field-label {
			display: inline-block;
			font-weight: 600;
			color: #2d3748;
			font-size: 14px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			margin-bottom: 8px;
			padding: 4px 12px;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			border-left: 3px solid #667eea;
			padding-left: 12px;
		}
		
		.field-value {
			background: #f8fafc;
			border: 2px solid #e2e8f0;
			border-radius: 12px;
			padding: 16px 20px;
			font-size: 16px;
			line-height: 1.6;
			color: #2d3748;
			transition: all 0.3s ease;
			position: relative;
			overflow: hidden;
		}
		
		.field-value::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
			transition: left 0.5s ease;
		}
		
		.field-value:hover::before {
			left: 100%;
		}
		
		.message-field .field-value {
			min-height: 120px;
			white-space: pre-wrap;
			word-wrap: break-word;
		}
		
		.email-link {
			color: #667eea;
			text-decoration: none;
			font-weight: 500;
			border-bottom: 2px solid transparent;
			transition: border-bottom-color 0.3s ease;
		}
		
		.email-link:hover {
			border-bottom-color: #667eea;
		}
		
		.footer {
			background: #f8fafc;
			padding: 30px;
			text-align: center;
			border-top: 1px solid #e2e8f0;
		}
		
		.footer-text {
			color: #718096;
			font-size: 14px;
			margin: 0;
		}
		
		.timestamp {
			background: #667eea;
			color: white;
			padding: 8px 16px;
			border-radius: 20px;
			font-size: 12px;
			font-weight: 500;
			display: inline-block;
			margin-top: 12px;
		}
		
		@media (max-width: 640px) {
			.container {
				margin: 20px;
				border-radius: 12px;
			}
			
			.header {
				padding: 30px 20px;
			}
			
			.header h1 {
				font-size: 24px;
			}
			
			.content {
				padding: 30px 20px;
			}
			
			.footer {
				padding: 20px;
			}
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>📬 New Contact Form Submission</h1>
			<p class="subtitle">You've received a new message from your website</p>
		</div>
		
		<div class="content">
			<div class="field-group">
				<div class="field-label">👤 Full Name</div>
				<div class="field-value">${name}</div>
			</div>
			
			<div class="field-group">
				<div class="field-label">📧 Email Address</div>
				<div class="field-value">
					<a href="mailto:${email}" class="email-link">${email}</a>
				</div>
			</div>
			
			<div class="field-group">
				<div class="field-label">📝 Subject</div>
				<div class="field-value">${subject}</div>
			</div>
			
			<div class="field-group message-field">
				<div class="field-label">💬 Message</div>
				<div class="field-value">${message}</div>
			</div>
		</div>
		
		<div class="footer">
			<p class="footer-text">
				This message was sent via your website's contact form
			</p>
			<div class="timestamp">
				Received: ${new Date().toLocaleString()}
			</div>
		</div>
	</div>
</body>
</html>
`;
