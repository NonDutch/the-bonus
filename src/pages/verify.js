import React, { useState } from "react";
import { useRouter } from "next/router";
import { request } from "../handlers/authentication";
import Layout from "../components/layout";
import { save, retrieve } from "../utils/persist";

function Verify() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const verifyToken = async code => {
    setSending(true);

    const email = retrieve("email");

    try {
      const {
        data: { success, token }
      } = await request({
        url: "/api/verify",
        data: { email, code }
      });

      const expires = parseInt(token.expires_in) * 1000;

      setSending(false);
      save("token", JSON.stringify(token));
      save("expiresIn", +new Date() + expires);
      return router.push("/dashboard");
    } catch (e) {
      setSending(false);
      setError(true);
    }
  };

  return (
    <Layout>
      <section className="form">
        <input
          type="text"
          placeholder="Your code"
          className="form__input"
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        <button
          disabled={code.length < 10 || sending}
          className="form__button"
          onClick={() => verifyToken(code)}
        >
          Verify
        </button>

        {error && <span className="form__error">Invalid code. Try again.</span>}
      </section>
    </Layout>
  );
}

export default Verify;
