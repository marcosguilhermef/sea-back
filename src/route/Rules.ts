export const Rules = {
    user: {
        user: {
            presence: {
                message: "O campo \"usuário\" é obrigatório."
            },
            length: {
                minimum: 4,
                maximum: 20,
                message: "O campo categoria deve ter no mínimo 4 e no máximo 20 caractéries."
            }
        },
        password: {
            presence: { message: "O campo \"senha\" é obrigatório." },
            length: {
                minimum: 4,
                maximum: 20,
                message: "O campo categoria deve ter no mínimo 4 e no máximo 20 caractéries."
            }

        },
        level: {
            presence: true,
        }
    },
    login: {
        user: {
            presence: {
                message: "O campo \"usuário\" é obrigatório."
            },
            length: {
                minimum: 4,
                maximum: 20,
                message: "O campo categoria deve ter no mínimo 4 e no máximo 20 caractéries."
            }
        },
        password: {
            presence: { message: "O campo \"senha\" é obrigatório." },
            length: {
                minimum: 4,
                maximum: 20,
                message: "O campo categoria deve ter no mínimo 4 e no máximo 20 caractéries."
            }

        }
    },
    updateUser: {
        id: {
            presence: {
                message: "O campo id é obrigatório."
            }
        },
        user: {
            length: {
                minimum: 4,
                maximum: 20,
                message: "O campo categoria deve ter no mínimo 4 e no máximo 20 caractéries."
            }
        },
        password: {
            length: {
                minimum: 4,
                maximum: 20,
                message: "O campo categoria deve ter no mínimo 4 e no máximo 20 caractéries."
            }
        },
    },
    deleteUser: {
        id: {
            presence: {
                message: "O campo id é obrigatório."
            }
        }
    }
}