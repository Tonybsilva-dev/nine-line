## Ajustes necessários e bugs conhecidos

### ✅ **CORRIGIDOS**

- [x] O Envio do email não acontece quando o usuário cria sua conta
- [x] O USER só pode alterar a data no máximo 3 vezes, dentro do prazo de 2 meses a partir da data do primeiro agendamento
- [x] **Sentry Configurado**: Monitoramento de erros funcionando corretamente
- [x] **Redis Estabilizado**: Health check e conectividade corrigidos
- [x] **Tipagens Corrigidas**: Erros de linting resolvidos

### 🔄 **EM PROGRESSO**

- [ ] Erro nada amigável ao atualizar um agendamento quando a data/hora de inicio é identica a de fim
- [ ] Criar o módulo de Account para separar o tipo de conta, desvinculando do usuário o USER_ROLE
- [ ] Criar módulo de Prefereces
- [ ] Adicionar horario de checkin - check-out no space

### 📋 **PRÓXIMOS PASSOS**

- [ ] Implementar testes automatizados (Vitest, Supertest)
- [ ] Melhorar documentação da API (Swagger/OpenAPI)
- [ ] Implementar sistema de notificações completo
- [ ] Otimizar queries do banco de dados
- [ ] Implementar sistema de backup automático
- [ ] Configurar CI/CD pipeline
- [ ] Implementar monitoramento de performance (APM)

### 🚨 **CRÍTICO**

- [ ] Completar implementação do RBAC
- [ ] Implementar validação robusta de dados
- [ ] Padronizar tratamento de erros em todos os módulos
- [ ] Implementar logging estruturado

---

_Última atualização: Sentry e Redis Corrigidos_ 🚀
