import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedNotifications() {
  try {
    console.log('🌱 Executando seeder de notificações...');

    const templates = [
      {
        name: 'welcome-email',
        type: 'EMAIL' as const,
        subject:
          '🎉 Bem-vindo(a) à nossa comunidade! Seu próximo espaço inesquecível te espera!',
        body: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Bem-vindo ao 9line Spaces</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6; 
                  color: #333; 
                  margin: 0; 
                  padding: 0; 
                  background-color: #f8f9fa;
                }
                .container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  background-color: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header { 
                  background-color: #007bff; 
                  color: white; 
                  padding: 20px; 
                  text-align: center; 
                }
                .content { 
                  padding: 20px; 
                }
                .cta-button {
                  display: inline-block;
                  background-color: #007bff;
                  color: white;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                  margin: 20px 0;
                }
                .footer { 
                  background-color: #f8f9fa; 
                  padding: 20px; 
                  text-align: center; 
                  font-size: 12px; 
                  border-top: 1px solid #e9ecef;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>9line Spaces</h1>
                </div>
                <div class="content">
                  <h2>Template: {{templateName}}</h2>
                  <p>Olá, {{userName}}!</p>
                  
                  <p>É uma alegria ter você com a gente. Seja muito bem-vindo(a) à <strong>9line Spaces</strong>, o lugar ideal para encontrar — e oferecer — espaços únicos para cada momento especial da sua vida.</p>
                  
                  <p>A partir de agora, você tem acesso a uma comunidade cheia de possibilidades, tudo isso com segurança, praticidade e um atendimento feito para você se sentir em casa, sempre e a qualquer momento.</p>
                  
                  <h3>✨ Pronto(a) para começar?</h3>
                  <p>Acesse sua conta e explore os espaços disponíveis ou cadastre o seu espaço para começar a receber hóspedes.</p>
                  
                  <div style="text-align: center;">
                    <a href="{{appUrl}}" class="cta-button">🔑 Acessar minha conta</a>
                  </div>
                  
                  <p>Se precisar de ajuda, estamos aqui para você.<br>
                  Conte com nossa equipe de suporte sempre que precisar.</p>
                  
                  <p><strong>Com carinho,<br>
                  Equipe 9line Spaces</strong><br>
                  <a href="{{appUrl}}">{{appUrl}}</a> • <a href="mailto:suporte@nine-line.com">suporte@nine-line.com</a></p>
                </div>
                <div class="footer">
                  <p>&copy; 2024 9line Spaces. Todos os direitos reservados.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        variables: ['userName', 'userEmail', 'appUrl', 'templateName'],
        isActive: true,
      },
      {
        name: 'appointment-pending-approval',
        type: 'EMAIL' as const,
        subject: '🗓️ Nova solicitação de agendamento aguardando aprovação',
        body: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Novo Agendamento Pendente</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6; 
                  color: #333; 
                  margin: 0; 
                  padding: 0; 
                  background-color: #f8f9fa;
                }
                .container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  background-color: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header { 
                  background-color: #007bff; 
                  color: white; 
                  padding: 20px; 
                  text-align: center; 
                }
                .content { 
                  padding: 20px; 
                }
                .footer { 
                  background-color: #f8f9fa; 
                  padding: 20px; 
                  text-align: center; 
                  font-size: 12px; 
                  border-top: 1px solid #e9ecef;
                }
                .info-list {
                  background-color: #f8f9fa;
                  padding: 15px;
                  border-radius: 6px;
                  margin: 15px 0;
                }
                .info-list ul {
                  margin: 0;
                  padding-left: 20px;
                }
                .info-list li {
                  margin-bottom: 8px;
                }

              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>9line Spaces</h1>
                </div>
                <div class="content">
                  <h2>Template: {{templateName}}</h2>
                  
                  <p>Olá <strong>{{managerName}}</strong>,</p>
                  
                  <p>Você recebeu uma nova solicitação de agendamento para um dos seus espaços disponíveis na plataforma <strong>{{siteName}}</strong>. Abaixo estão os detalhes do pedido feito por um cliente interessado:</p>
                  
                  <div class="info-list">
                    <h3>📌 Informações do Agendamento:</h3>
                    <ul>
                      <li><strong>Espaço solicitado:</strong> {{spaceTitle}}</li>
                      <li><strong>Solicitante:</strong> {{userName}}</li>
                      <li><strong>Período solicitado:</strong> De {{startDate}} até {{endDate}}</li>
                      <li><strong>Número de pessoas:</strong> {{guestCount}} hóspedes/participantes</li>
                      {{#if additionalNotes}}
                      <li><strong>Observações adicionais:</strong> {{additionalNotes}}</li>
                      {{/if}}
                    </ul>
                  </div>
                  
                  <p>Este pedido está pendente de sua aprovação. Recomendamos que você revise as informações e responda o quanto antes para garantir uma boa experiência ao usuário.</p>
                  
                  <div style="text-align: center; margin: 20px 0;">
                    <a href="{{approveUrl}}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">✅ Aprovar</a>
                    <a href="{{rejectUrl}}" style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">❌ Recusar</a>
                  </div>
                  
                  <p>Lembrando que, ao confirmar, o cliente será notificado imediatamente e receberá as orientações para finalização do processo.</p>
                  
                  <p>Se precisar fazer qualquer ajuste ou tiver dúvidas, estamos à disposição para ajudar.</p>
                  
                  <p><strong>Atenciosamente,<br>
                  Equipe {{siteName}}</strong><br>
                  <a href="{{siteUrl}}">{{siteUrl}}</a> • <a href="mailto:{{supportEmail}}">{{supportEmail}}</a> • {{supportPhone}}</p>
                </div>
                <div class="footer">
                  <p>&copy; 2024 9line Spaces. Todos os direitos reservados.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        variables: [
          'managerName',
          'siteName',
          'spaceTitle',
          'userName',
          'startDate',
          'endDate',
          'guestCount',
          'additionalNotes',
          'approveUrl',
          'rejectUrl',
          'siteUrl',
          'supportEmail',
          'supportPhone',
          'templateName',
        ],
        isActive: true,
      },
      {
        name: 'appointment-approved',
        type: 'EMAIL' as const,
        subject: 'Agendamento Aprovado!',
        body: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Agendamento Aprovado</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6; 
                  color: #333; 
                  margin: 0; 
                  padding: 0; 
                  background-color: #f8f9fa;
                }
                .container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  background-color: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header { 
                  background-color: #007bff; 
                  color: white; 
                  padding: 20px; 
                  text-align: center; 
                }
                .content { 
                  padding: 20px; 
                }
                .footer { 
                  background-color: #f8f9fa; 
                  padding: 20px; 
                  text-align: center; 
                  font-size: 12px; 
                  border-top: 1px solid #e9ecef;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Nine Line</h1>
                </div>
                <div class="content">
                  <h2>Template: {{templateName}}</h2>
                  <p>Parabéns, {{userName}}!</p>
                  <p>Seu agendamento foi aprovado com sucesso!</p>
                  <p><strong>Espaço:</strong> {{spaceTitle}}</p>
                  <p><strong>Data:</strong> {{appointmentDate}}</p>
                  <p><strong>Horário:</strong> {{startTime}} - {{endTime}}</p>
                  <a href="{{appUrl}}/appointments/{{appointmentId}}">Ver Detalhes</a>
                </div>
                <div class="footer">
                  <p>&copy; 2024 9line Spaces. Todos os direitos reservados.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        variables: [
          'appointmentId',
          'spaceTitle',
          'userName',
          'appointmentDate',
          'startTime',
          'endTime',
          'appUrl',
          'templateName',
        ],
        isActive: true,
      },
      {
        name: 'appointment-approved-host',
        type: 'EMAIL' as const,
        subject: 'Agendamento Aprovado - Confirmação',
        body: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Agendamento Aprovado - Confirmação</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6; 
                  color: #333; 
                  margin: 0; 
                  padding: 0; 
                  background-color: #f8f9fa;
                }
                .container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  background-color: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header { 
                  background-color: #007bff; 
                  color: white; 
                  padding: 20px; 
                  text-align: center; 
                }
                .content { 
                  padding: 20px; 
                }
                .footer { 
                  background-color: #f8f9fa; 
                  padding: 20px; 
                  text-align: center; 
                  font-size: 12px; 
                  border-top: 1px solid #e9ecef;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>9line Spaces</h1>
                </div>
                <div class="content">
                  <h2>Template: {{templateName}}</h2>
                  <p>Você aprovou com sucesso um agendamento para seu espaço.</p>
                  <p><strong>Espaço:</strong> {{spaceTitle}}</p>
                  <p><strong>Usuário:</strong> {{userName}}</p>
                  <p><strong>Data:</strong> {{appointmentDate}}</p>
                  <p><strong>Horário:</strong> {{startTime}} - {{endTime}}</p>
                  <p><strong>Aprovado por:</strong> {{approvedBy}}</p>
                  <a href="{{adminUrl}}/appointments/{{appointmentId}}">Ver Detalhes</a>
                </div>
                <div class="footer">
                  <p>&copy; 2024 9line Spaces. Todos os direitos reservados.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        variables: [
          'appointmentId',
          'spaceTitle',
          'userName',
          'appointmentDate',
          'startTime',
          'endTime',
          'approvedBy',
          'adminUrl',
          'templateName',
        ],
        isActive: true,
      },
      {
        name: 'appointment-cancelled',
        type: 'EMAIL' as const,
        subject: 'Agendamento Cancelado',
        body: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Agendamento Cancelado</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6; 
                  color: #333; 
                  margin: 0; 
                  padding: 0; 
                  background-color: #f8f9fa;
                }
                .container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  background-color: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header { 
                  background-color: #007bff; 
                  color: white; 
                  padding: 20px; 
                  text-align: center; 
                }
                .content { 
                  padding: 20px; 
                }
                .footer { 
                  background-color: #f8f9fa; 
                  padding: 20px; 
                  text-align: center; 
                  font-size: 12px; 
                  border-top: 1px solid #e9ecef;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>9line Spaces</h1>
                </div>
                <div class="content">
                  <h2>Template: {{templateName}}</h2>
                  <p>Olá, {{userName}}!</p>
                  <p>Informamos que seu agendamento foi cancelado.</p>
                  <p><strong>Espaço:</strong> {{spaceTitle}}</p>
                  <p><strong>Data:</strong> {{appointmentDate}}</p>
                  <p><strong>Horário:</strong> {{startTime}} - {{endTime}}</p>
                  <p><strong>Motivo do Cancelamento:</strong> {{cancellationReason}}</p>
                  <a href="{{appUrl}}/spaces">Agendar Novo Espaço</a>
                </div>
                <div class="footer">
                  <p>&copy; 2024 9line Spaces. Todos os direitos reservados.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        variables: [
          'appointmentId',
          'spaceTitle',
          'userName',
          'appointmentDate',
          'startTime',
          'endTime',
          'cancellationReason',
          'appUrl',
          'templateName',
        ],
        isActive: true,
      },
    ];

    for (const templateData of templates) {
      try {
        // Verificar se o template já existe
        const existingTemplate = await prisma.notificationTemplate.findFirst({
          where: { name: templateData.name },
        });

        if (existingTemplate) {
          console.log(`✅ Template já existe: ${templateData.name}`);
          continue;
        }

        // Criar o template
        const template = await prisma.notificationTemplate.create({
          data: {
            name: templateData.name,
            type: templateData.type,
            subject: templateData.subject,
            body: templateData.body,
            variables: templateData.variables,
            isActive: templateData.isActive,
          },
        });

        console.log(
          `✅ Template criado: ${template.name} (ID: ${template.id})`,
        );
      } catch (error) {
        console.error(`❌ Erro ao criar template ${templateData.name}:`, error);
      }
    }

    console.log('✅ Seeder de notificações executado com sucesso!');
    console.log('');
    console.log('📋 Templates criados/verificados:');
    console.log('- welcome-email');
    console.log('- appointment-pending-approval');
    console.log('- appointment-approved');
    console.log('- appointment-approved-host');
    console.log('- appointment-cancelled');
  } catch (error) {
    console.error('❌ Erro ao executar seeder de notificações:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar seeder se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedNotifications()
    .then(() => {
      console.log('🎉 Seeder de notificações concluído!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erro fatal no seeder:', error);
      process.exit(1);
    });
}

export { seedNotifications };
