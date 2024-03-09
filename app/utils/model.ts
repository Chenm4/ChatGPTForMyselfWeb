import { LLMModel } from "../client/api";

export function collectModelTable(
  models: readonly [
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4";
      available: true;
    },
    { name: "gpt-4-1106-preview"; available: true },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-0314";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-0613";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-32k";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-32k-0314";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-32k-0613";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-turbo-preview";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-1106-preview";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-0125-preview";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-4-vision-preview";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-3.5-turbo";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-3.5-turbo-0125";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-3.5-turbo-0301";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-3.5-turbo-0613";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-3.5-turbo-1106";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-3.5-turbo-16k";
      available: true;
    },
    {
      provider: {
        id: "openai";
        providerName: "OpenAI";
        providerType: "openai";
      };
      name: "gpt-3.5-turbo-16k-0613";
      available: true;
    },
    {
      provider: {
        id: "google";
        providerName: "Google";
        providerType: "google";
      };
      name: "gemini-pro";
      available: true;
    },
    {
      provider: {
        id: "google";
        providerName: "Google";
        providerType: "google";
      };
      name: "gemini-pro-vision";
      available: true;
    },
  ],
  customModels: string,
) {
  const modelTable: Record<
    string,
    {
      available: boolean;
      name: string;
      displayName: string;
      provider?: LLMModel["provider"]; // Marked as optional
    }
  > = {};

  // default models
  models.forEach((m) => {
    modelTable[m.name] = {
      ...m,
      displayName: m.name, // 'provider' is copied over if it exists
    };
  });

  // server custom models
  customModels
    .split(",")
    .filter((v) => !!v && v.length > 0)
    .forEach((m) => {
      const available = !m.startsWith("-");
      const nameConfig =
        m.startsWith("+") || m.startsWith("-") ? m.slice(1) : m;
      const [name, displayName] = nameConfig.split("=");

      // enable or disable all models
      if (name === "all") {
        Object.values(modelTable).forEach(
          (model) => (model.available = available),
        );
      } else {
        modelTable[name] = {
          name,
          displayName: displayName || name,
          available,
          provider: modelTable[name]?.provider, // Use optional chaining
        };
      }
    });
  return modelTable;
}

/**
 * Generate full model table.
 */
export function collectModels(
  models: readonly LLMModel[],
  customModels: string,
) {
  const modelTable = collectModelTable(models, customModels);
  const allModels = Object.values(modelTable);

  return allModels;
}
