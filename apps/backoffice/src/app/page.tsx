import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nine-line/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">9line Spaces Backoffice</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Componentes UI</CardTitle>
              <CardDescription>
                Demonstração dos componentes compartilhados do pacote UI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button variant="primary">Botão Primário</Button>
                <Button variant="secondary">Botão Secundário</Button>
                <Button variant="outline">Botão Outline</Button>
                <Button variant="ghost">Botão Ghost</Button>
              </div>

              <div className="flex gap-4 items-center">
                <Button size="sm">Pequeno</Button>
                <Button size="md">Médio</Button>
                <Button size="lg">Grande</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status da Aplicação</CardTitle>
              <CardDescription>
                Verificação do funcionamento do backoffice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-green-600 font-medium">
                ✅ Aplicação funcionando corretamente!
              </p>
              <div className="flex gap-4 mt-4">
                <Button>Dashboard</Button>
                <Button variant="secondary">Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
