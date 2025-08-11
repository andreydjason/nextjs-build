"use client"

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    try {
      console.log("Form:", { name, email, password });
      await authClient.signUp.email({
        name,
        email,
        password
      }, {
          onRequest: (ctx) => {
            setMessage("Carregando...");
          },
          onSuccess: (ctx) => {
            setMessage('Sucesso');
            window.alert('Sucesso');
          },
          onError: (ctx) => {
            setMessage(ctx.error.message);
          },
      });
    } catch {
      setMessage("Erro de conexão.");
      window.alert("Erro de conexão.");
    }
  }

  return (
    <div className="flex-grow text-center">
      {message && <div className="mt-2 text-sm">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
        <div>
          <Label className="block mb-1">Nome</Label>
          <Input
            type="text"
            placeholder="Nome"
            data-slot="input"
            className="border px-2 py-1 w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label className="block mb-1">Email</Label>
          <Input
            type="email"
            placeholder="E-mail"
            data-slot="email"
            className="border px-2 py-1 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label className="block mb-1">Senha</Label>
          <Input
            type="password"
            placeholder="Senha"
            data-slot="password"
            className="border px-2 py-1 w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}