import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { usuario, senha } = await req.json();
    const usuarioEnv = process.env.NOME_USUARIO;
    const senhaEnv = process.env.SENHA_USUARIO;

    if (!usuarioEnv || !senhaEnv) {
      return NextResponse.json({ mensagem: 'Erro de configuração do servidor' }, { status: 500 });
    }

    if (usuario === usuarioEnv && senha === senhaEnv) {
      return NextResponse.json({ mensagem: 'Login bem-sucedido' }, { status: 200 });
    } else {
      return NextResponse.json({ mensagem: 'Credenciais incorretas' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ mensagem: 'Erro ao processar a solicitação' }, { status: 500 });
  }
}
